import json
import os

from pymongo import MongoClient
import ast
client = MongoClient('mongodb://localhost:27017/')
print("coucou")
list_platform = [("AERIS","https://www.aeris-data.fr/catalogue/"),("ODATIS","https://www.odatis-ocean.fr/donnees-et-services/acces-aux-donnees/catalogue-complet#/"),("PDB","https://data.rcsb.org/rest/v1/")]
for tuple_i in list_platform :
    file_list = os.listdir(tuple_i[0]+"/metadata_files/")

    for file in file_list:
        with open(tuple_i[0]+"/metadata_files/"+file) as f :
            # print(tuple_i[0]+"/metadata_files/"+file)
            # print(tuple_i[0])
            dict = {"location":tuple_i[1], "platform":tuple_i[0], "id":file.split(".")[0]}
            # print(f.read())
            try :
                dict["metadata_model"]= json.loads(f.read())
                if tuple_i[0] == "AERIS":

                    if "keywords" in dict["metadata_model"]:
                        if dict["metadata_model"]["keywords"] is not None:
                            if isinstance(dict["metadata_model"]["keywords"], list):
                                liste_key = []
                                for concept in dict["metadata_model"]["keywords"]:
                                    liste_key.append(concept["concept"])
                                dict["keyword"] = liste_key
                            else:
                                dict["keyword"] = []


                        else:
                            dict["keyword"] = []
                    else:
                        dict["keyword"] = []
                    author = []
                    for person in dict["metadata_model"]["contacts"]:
                        if person["name"] != "":

                            author.append(person["name"])
                        else:
                            name = ""
                            if person["firstName"] != "":
                                name += person["firstName"]
                            if person["lastName"] != "":
                                name += " " + person["lastName"]
                            author.append(name)
                    dict["contact"] = author
                    if "publications" in dict["metadata_model"]:
                        if isinstance(dict["metadata_model"]["publications"],list):
                            dict["author"]=dict["metadata_model"]["publications"][0]["authors"]
                        else :
                            dict["author"]=[]
                    else:
                        dict["author"]=[]

                    dict["country"] = []
                    print(dict)
                if tuple_i[0] == "ODATIS":
                    dict["keyword"] = \
                    dict["metadata_model"]["identificationInfo"]["MD_DataIdentification"]["descriptiveKeywords"][
                        "MD_Keywords"]["keyword"]["CharacterString"]["value"]
                    dict["contact"] = \
                    dict["metadata_model"]["identificationInfo"]["MD_DataIdentification"]["pointOfContact"][
                        "CI_ResponsibleParty"]["individualName"]["CharacterString"]["value"]
                    dict["country"] = \
                    dict["metadata_model"]["identificationInfo"]["MD_DataIdentification"]["pointOfContact"][
                        "CI_ResponsibleParty"]["contactInfo"]["CI_Contact"]["address"]["CI_Address"]["country"][
                        "CharacterString"]["value"]
                    dict["author"]=[]
                if tuple_i[0] == "PDB":

                    dict["keyword"] = dict["metadata_model"]["struct_keywords"]["pdbx_keywords"]
                    # if isinstance(dict["metadata_model"]["citation"], list):
                    #     authors = []
                    #     country = []
                    #     for citation in dict["metadata_model"]["citation"] :
                    #         authors.append(citation["rcsb_authors"])
                    #         country.append(citation["country"])
                    #     dict["author"]=authors
                    #     dict["country"] = country
                    # else :
                    if "rcsb_primary_citation" in dict["metadata_model"]:
                        dict["author"] = dict["metadata_model"]["rcsb_primary_citation"]["rcsb_authors"]
                    else:
                        dict["author"] = []
                    try:
                        dict["country"] = dict["metadata_model"]["rcsb_primary_citation"]["country"]
                    except:
                        dict["country"] = []

                # print(dict["keyword"])
                client.input.pdb.insert_one(dict)
            except:
                print("CA MARCHE PAS : " +file)

            # break
# print(str(list(client.input.pdb.find())))
#     break
file_list = os.listdir("./matching/")
for file in file_list:
    print(file)
    client.input.matches.insert_one(json.load(open("./matching/"+file,"r")))
print("trest")
