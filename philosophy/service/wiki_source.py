import requests
from bs4 import BeautifulSoup

template = "https://en.wikipedia.org/wiki/"   

def get_soup_from_url(url):
    page = requests.get(url)
    return BeautifulSoup(page.text)

def isValid(href):
    if not href or "#" in href or "//" in href or ":" in href:
        return False
    if "/wiki/" not in href:
        return False
    
    return True

def getFirstLink(wikipage):
    soup = get_soup_from_url(template+wikipage)
    for p_or_ul in soup.find_all(['p', 'ul']):       
        if not p_or_ul.parent.has_attr('class') or 'mw-parser-output' not in p_or_ul.parent['class']:
            continue
        for link in p_or_ul.find_all('a'):
            if isValid(link.get('href')):
                return link

def getPathToPhilosophy(articleName, nb_iter_max=50):
    path = []
    if articleName != 'Special:Random':
        path.append(articleName)
        
    nb_iter = 0
    while nb_iter < nb_iter_max:
        firstlink = getFirstLink(articleName)
        if firstlink == None:
            return path
        
        nextArticle = firstlink.get('title')
        path.append(nextArticle)
        if nextArticle == 'Philosophy':
            break
            
        articleName = nextArticle
        nb_iter+=1
    
    return path

def getRandomPathToPhilosophy():
    return getPathToPhilosophy('Special:Random')