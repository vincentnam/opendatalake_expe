Get all Journal name in pdb metadata

    grep 'rcsb_journal_abbrev": "[ :a-Z]*",' -ho ./mongodb/PDB/metadata_files/* | sort --unique > list_of_pdb_journal_abbrev.txt 