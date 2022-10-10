
import pandas as pd
import numpy as np
import os

# 파일들이 있는 폴더명으로 폴더내 파일 목록 확인
forders = os.listdir('data')
# print(forders)

df_all = pd.DataFrame()
for i in range(0,len(forders)):
    if forders[i].split('.')[1] == 'csv':
        file = '/home/ubuntu/scheduler/data/'+forders[i]
        df= pd.read_csv(file,encoding='utf-8') 
        df_all = pd.concat([df_all, df])
        
df_all
df_all.to_csv("/home/ubuntu/scheduler/pre/total.csv", index=False) 
