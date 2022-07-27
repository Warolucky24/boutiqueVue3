import data from "./product"

export default async function seed(collecionName: string)
{
    await fetch(`https://restapi.fr/api/${collecionName}`,{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    })
}