
class SWService {
    getSWApi = async (path) => {
        const res = await fetch(path);
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error('Error');
        }
    }

    get10TransformedPeoples(path) {
        return new Promise((resolve, reject) => {
            this.getSWApi(path)
            .then((res) => {
                const dataArray = [...res.results];
                let arrayOfPromises = [];
                    dataArray.forEach((people) =>{
                    if (!people.species.length) {
                        people.species = ["https://swapi.dev/api/species/1/"];
                    }
                    people.color = 'background:#' + (Math.random().toString(16) + '000000').substring(2,8).toUpperCase();
                    arrayOfPromises = [...arrayOfPromises, this.getSWApi(people.species)];
                });
                Promise.all(arrayOfPromises)
                .then((res) => {
                    const newRes = res.map((species) => {
                        return species.name;
                    });
                    dataArray.forEach((people, i) => {
                        people.speciesName = newRes[i];
                    })
                    resolve(dataArray);
                }).catch(e => console.warn(e));
            })
        })
    }


}

export default SWService;

