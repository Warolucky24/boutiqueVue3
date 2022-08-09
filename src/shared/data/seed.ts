import data from "./product"

export async function seed(collecionName: string)
{
    await fetch(`https://restapi.fr/api/${collecionName}`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
}


export async function seed_50_articles(collecionName: string)
{
    await fetch(`https://restapi.fr/generator`,{
        method: "POST",
        body: JSON.stringify(
            {
                "times": 50,
                "resourceName": collecionName,
                "title": "name",
                "image": {
                    "type": "image",
                    "theme": 'computer',
                    "height": 200,
                    "width": 300
                },
                "category": {
                    "type": "collection",
                    "values": ['gamer', 'desktop', 'streaming'],
                    "unique": false
                },
                "description": {
                    "type": "sentence",
                    "range": [9, 12]
                },
                "price" :{
                    "type":'number',
                    'range': [800,2500]
                }
            }
        ),
        headers: {
            "Content-type": "application/json"
        }
    })
}