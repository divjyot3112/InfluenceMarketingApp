import pymongo
import pandas as pd
import numpy as np
from sklearn.metrics import pairwise_distances

def createCategorical(df):
    #create a column for each day_of_week
    categories = ["Apparels","Automobile","Beauty and Personal Care","Education","Electronics","Entertainment","Fitness & Gym","Food","Health","Kids","Photography","Sports & Outdoors","Travel","Video Games"]
    categoryFeatures = pd.DataFrame(0, index=np.arange(len(df)), columns=categories)
    for f in range(len(categories)):
        categoryFeatures[categories[f]] = (df['category'] == categories[f])*1
        
    categoryFeatures["id"]=df["id"]
    categoryFeatures["salary"]=df["salary"]
    return categoryFeatures

if __name__=='__main__':
	myclient = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-xnxsx.mongodb.net/test?retryWrites=true&w=majority")
	mydb = myclient["test"]
	tasks = mydb["tasks"]
	influencers = mydb["influencerprofiles"]
	all_influencers = pd.DataFrame(columns = ['email'])
	for  x in influencers.find():
		all_influencers = all_influencers.append({'email':x['email']},ignore_index=True)
	
	for index, row in all_influencers.iterrows():
		appliedTasks = pd.DataFrame(columns = ['id','category','salary'])
		otherTasks = pd.DataFrame(columns = ['id','category','salary'])
    
		for x in tasks.find({'appliedCandidates': {'$elemMatch': {'$eq': row['email']}}}):
			appliedTasks = appliedTasks.append({'id':x['_id'],'category':x['category'],'salary':x['salary']},ignore_index=True)
			
		for x in tasks.find({'$nor': [{
										'appliedCandidates': {
											'$elemMatch': {'$eq': row['email']}
										}
									}
									], 'status':'Created','isActive':True}):
			otherTasks = otherTasks.append({'id':x['_id'],'category':x['category'],'salary':x['salary']},ignore_index=True)
		appliedTasks = createCategorical(appliedTasks)
		otherTasks = createCategorical(otherTasks)
		sorted_tasks=[]
		similarities = {}
		if(len(appliedTasks) > 0):
			for index1, row1 in otherTasks.loc[:,otherTasks.columns != 'id'].iterrows():
				sims = pairwise_distances(np.asarray(row1).reshape(-1, 1).T, appliedTasks.loc[:,appliedTasks.columns != 'id'], metric='cosine')
				similarities[otherTasks.loc[index1,'id']] = np.sum(sims)/len(appliedTasks)
			sorted_x = sorted(similarities.items(), key=lambda kv: kv[1], reverse=True)
			sorted_tasks = np.asarray([i[0] for i in sorted_x])
		else:
			#cold start send hightly paid tasks
			sorted_tasks = np.asarray(otherTasks.sort_values(by=['salary'],ascending=False).loc[:,'id'])
		#print(row['email'])
		recommended_tasks = mydb["recommended_tasks"]
		recommended_tasks.find_one_and_update({
			'email':row['email']
		},{"$set":{
			"tasks":list(sorted_tasks[:10])
		}},upsert=True)