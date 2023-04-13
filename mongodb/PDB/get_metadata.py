import requests
import ast
import os
import json

file_list = os.listdir("metadata_files")
with open("./PDB_entry_ids_list.txt") as f :
    list_id = ast.literal_eval(f.read())
    for id in list_id:
        if "entry_"+id+".json" not in file_list:
            with open("./metadata_files/entry_"+id+".json", "w") as f_out :
                json.dump(requests.get("https://data.rcsb.org/rest/v1/core/entry/"+id).json(), f_out)
            print(id)
