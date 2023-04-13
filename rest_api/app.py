import flask
from flask import Flask, request
from flask_cors import CORS
from pymongo import MongoClient




app = Flask(__name__)
CORS(app)
from datetime import datetime
client = MongoClient("localhost:27017")
@app.route("/get_metadata")
def get_metadata():
    '''
    Model used as pivotal model : PDB's model
    :return:
    '''
    #
    # print(request.data)

    print(request.headers)
    # print(request.json())
    # print(request.headers["begincitationDate"])
    # print(request.headers["endcitationDate"])
    # return (list(client.input.pdb.find({"metadata_model.pdbx_database_status.recvd_initial_deposition_date":{"$and" : [{"$gt":request.headers["begincitationDate"]},{"$lt":request.headers["endcitationDate"]}]}},{"metadata_model.pdbx_database_status.recvd_initial_deposition_date":1,"_id":0})))
    # return (list(client.input.pdb.find({"$and":[{"metadata_model.pdbx_database_status.recvd_initial_deposition_date": {"$gt": request.headers["begincitationDate"]}},{"metadata_model.pdbx_database_status.recvd_initial_deposition_date": {"$lt": request.headers["endcitationDate"]}}  ]},{"metadata_model.pdbx_database_status.recvd_initial_deposition_date": 1})))
    geo_matching = (client.input.matches.find({"platform": {"$eq": "AERIS"}}, {"_id": 0}))[0]
    filter = {"$or":[]}
    ret_matches = (client.input.matches.find({"platform": {"$eq": "PDB"}}, {"_id": 0}))[0]
    # if "PDB" in request.headers["platform"] or request.headers["platform"] == "":
    if "begincitationDate" in request.headers or "endcitationDate" in request.headers:
        aux_and = {"$and": []}
        if "begincitationDate" in request.headers:
            aux_and["$and"].append({"metadata_model.citation.year": {"$gte": int(request.headers["begincitationDate"])}})
        if "endcitationDate" in request.headers:
            aux_and["$and"].append({"metadata_model.citation.year": {"$lte": int(request.headers["endcitationDate"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)
            aux_and = {"$and": []}

        if "begincitationDate" in request.headers:
            for match_key in ret_matches["matches"]["citation.year"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$gte": int(request.headers["begincitationDate"])}})


        if "endcitationDate" in request.headers:
            for match_key in ret_matches["matches"]["citation.year"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$lte": int(request.headers["endcitationDate"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)


    if "Beginreleasedate" in request.headers or "Endreleasedate" in request.headers:
        aux_and = {"$and": []}
        if "Beginreleasedate" in request.headers:
            aux_and["$and"].append({"metadata_model.rcsb_accession_info.initial_release_date": {"$gte": (request.headers["Beginreleasedate"])}})
        if "Endreleasedate" in request.headers:
            aux_and["$and"].append({"metadata_model.rcsb_accession_info.initial_release_date": {"$lte": (request.headers["Endreleasedate"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)
            aux_and = {"$and": []}

        if "Beginreleasedate" in request.headers:
            for match_key in ret_matches["matches"]["rcsb_accession_info.initial_release_date"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$gte": (request.headers["Beginreleasedate"])}})


        if "Endreleasedate" in request.headers:
            for match_key in ret_matches["matches"]["rcsb_accession_info.initial_release_date"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$lte": (request.headers["Endreleasedate"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)

    if "Begintemporalextent" in request.headers or "Endtemporalextent" in request.headers:
        aux_and = {"$and": []}
        if "Begintemporalextent" in request.headers:
            aux_and["$and"].append({"metadata_model.temporalExtents.beginDate": {
                "$gte": (request.headers["Begintemporalextent"])}})
        if "Endtemporalextent" in request.headers:
            aux_and["$and"].append({"metadata_model.temporalExtents.endDate": {
                "$lte": (request.headers["Endtemporalextent"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)
            aux_and = {"$and": []}

        if "Beginreleasedate" in request.headers:
            for match_key in ret_matches["matches"]["rcsb_accession_info.initial_release_date"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$gte": (request.headers["Beginreleasedate"])}})

        if "Endreleasedate" in request.headers:
            for match_key in ret_matches["matches"]["rcsb_accession_info.initial_release_date"]:
                aux_and["$and"].append(
                    {"metadata_model." + match_key["key"]: {"$lte": (request.headers["Endreleasedate"])}})
        if len(aux_and["$and"]) > 0:
            filter["$or"].append(aux_and)

    #

    # if "beginreleaseDate" in request.headers or "endreleaseDate" in request.headers :
    #     if "beginreleaseDate" in request.headers:
    #         filter["$or"].append({"metadata_model.rcsb_accession_info.initial_release_date": {"$gte": (request.headers["beginreleaseDate"])}})
    #     if "endreleaseDate" in request.headers:
    #         filter["$or"].append({"metadata_model.rcsb_accession_info.initial_release_date": {"$lte": (request.headers["endreleaseDate"])}})

    # pred_list = [{"metadata_model.citation.year": {"$gt": 2000}}]
    if "isGeo" in request.headers:
        if request.headers["isGeo"] == "true":
            filter["$or"].append({"$and":[
                {"$and":[{"metadata_model.spatialExtents.area.westLongitude": {"$gte": float(request.headers["Westlong"])}},
                         {"metadata_model.spatialExtents.area.westLongitude": {"$lte": float(request.headers["Eastlong"])}}]},
                {"$and": [{"metadata_model.spatialExtents.area.eastLongitude": {"$gte": float(request.headers["Westlong"])}},
                          {"metadata_model.spatialExtents.area.eastLongitude": {"$lte": float(request.headers["Eastlong"])}}]},
                {"$and": [{"metadata_model.spatialExtents.area.southLatitude": {"$gte": float(request.headers["Southlat"])}},
                          {"metadata_model.spatialExtents.area.southLatitude": {"$lte": float(request.headers["Northlat"])}}]},
                {"$and": [{"metadata_model.spatialExtents.area.northLatitude": {"$gte": float(request.headers["Southlat"])}},
                          {"metadata_model.spatialExtents.area.northLatitude": {"$lte": float(request.headers["Northlat"])}}]}]})
            # Get matches
            # Hypothesis (for simplifications) : each geo-match contains 4 informations (north/south longitude + east/west latitude)
            if all(key in ["metadata_model.spatialExtents.area.westLongitude","metadata_model.spatialExtents.area.eastLongitude",
                           "metadata_model.spatialExtents.area.southLatitude","metadata_model.spatialExtents.area.northLatitude"]
                   for key in geo_matching["matches"]):
                        for i in range(len(geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"])):
                            # It's assumed all geo extent are same type among the same model
                            if geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["type"]=="string":
                                filter["$or"].append({"$and":[
                                    {"$and":[{geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["key"]: {"$gte": (request.headers["Westlong"])}},
                                             {geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["key"]: {"$lte": (request.headers["Eastlong"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.eastLongitude"][i]["key"]: {"$gte": (request.headers["Westlong"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.eastLongitude"][i]["key"]: {"$lte": (request.headers["Eastlong"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.southLatitude"][i]["key"]: {"$gte": (request.headers["Southlat"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.southLatitude"][i]["key"]: {"$lte": (request.headers["Northlat"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.northLatitude"][i]["key"]: {"$gte": (request.headers["Southlat"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.northLatitude"][i]["key"]: {"$lte": (request.headers["Northlat"])}}]}]})
                            if geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["type"]=="float":
                                filter["$or"].append({"$and":[
                                    {"$and":[{geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["key"]: {"$gte": float(request.headers["Westlong"])}},
                                             {geo_matching["matches"]["metadata_model.spatialExtents.area.westLongitude"][i]["key"]: {"$lte": float(request.headers["Eastlong"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.eastLongitude"][i]["key"]: {"$gte": float(request.headers["Westlong"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.eastLongitude"][i]["key"]: {"$lte": float(request.headers["Eastlong"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.southLatitude"][i]["key"]: {"$gte": float(request.headers["Southlat"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.southLatitude"][i]["key"]: {"$lte": float(request.headers["Northlat"])}}]},
                                    {"$and": [{geo_matching["matches"]["metadata_model.spatialExtents.area.northLatitude"][i]["key"]: {"$gte": float(request.headers["Southlat"])}},
                                              {geo_matching["matches"]["metadata_model.spatialExtents.area.northLatitude"][i]["key"]: {"$lte": float(request.headers["Northlat"])}}]}]})




    if "Publicationname" in request.headers:
        if request.headers["Publicationname"] != "":
            for journal in request.headers["Publicationname"].split(","):

                filter["$or"].append({"metadata_model.citation.title": {"$regex": journal}})
                for match_key in ret_matches["matches"]["citation.title"]:
                    filter["$or"].append({"metadata_model."+match_key["key"]:{"$regex":journal, "$options":"i"}})
    if "journals" in request.headers:
        if request.headers["journals"] != "":
            for journal in request.headers["journals"].split(","):

                filter["$or"].append({"metadata_model.citation.rcsb_journal_abbrev": {"$regex": journal}})
                for match_key in ret_matches["matches"]["citation.rcsb_journal_abbrev"]:
                    filter["$or"].append({"metadata_model."+match_key["key"]:{"$regex":journal, "$options":"i"}})
    if "keywords" in request.headers:
        if request.headers["keywords"] != "":
            for keyword in request.headers["keywords"].split(","):
                # {"metadata_model.keywords.concept": {$regex: "OzO", $options: "i"}}
                # filter["$or"].append({"$regexFindAll":{"input":"$metadata_model.struct_keywords.pdbx_keywords","regex":keyword,"options":"i"}})
                filter["$or"].append({"metadata_model.struct_keywords.pdbx_keywords": {"$regex": keyword,"$options":"i"}})
                for match_key in ret_matches["matches"]["struct_keywords.pdbx_keywords"]:
                    # filter["$or"].append({"$regexFindAll": {"input": "$metadata_model." + match_key["key"],
                    #                                       "regex": keyword, "options": "i"}})
                    filter["$or"].append({"metadata_model." + match_key["key"]: {"$regex": keyword,"$options":"i"}})
    if len(filter["$or"]) == 0:
        if request.headers["platform"] == "" :
            filter = {}
        else :
            # print(request.headers["platform"].split(","))
            for platform in request.headers["platform"].split(","):
                filter["$or"].append({"platform" : {"$eq" : platform}})
    print(filter)
    # ret = list(client.input.pdb.find(filter , {"_id" : 0}))
    pipeline = [{"$match":filter},{"$project":{"_id":0}}]
    return list(client.input.pdb.aggregate(pipeline))
    # return "coucou"



@app.route("/get_matches")
def get_matches():

    ret_matches = (client.input.matches.find({"platform":{"$eq":"PDB"}},{"_id":0}))[0]
    print(ret_matches)
    pred_list = [{"metadata_model.citation.year":{"$gt":2000}}]



    for match_key in ret_matches["matches"]["citation.year"]:
        pred_list.append({"$metadata_model."+match_key["key"]:{"$gt":2000}})
    req = {"$or":pred_list}
    # print(req)
    # print(list(client.input.pdb.find({"$where" : 'return this.metadata_model.citation.year.getYear() >=2000'})))
    # {$or: [{'metadata_model.citation.year': {$gt: '2000-01-01'}},{'metadata_model.publication.publicationYear': {$gt: '2000-01-01'}},{'metadata_model.citation.CI_citation.date.CI_date.date.Date': {$gt: '2000-01-01'}}]}
    # client.input.pdb.exec()
    ret = client.input.pdb.find(req, {"_id":0})
    # print(list(ret))
    return list(ret)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"