import requests

r = requests.get('http://localhost:3000/api/user/list')

if (r.status_code == requests.codes.ok):
	#print r.headers['content-type']
	
	for usuario in r.json():
		print usuario[u'login']
	
	verbs = requests.options(r.url)
	print verbs.status_code
