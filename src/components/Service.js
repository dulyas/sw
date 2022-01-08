class SWService {
    getSWApi = async (path) => {
        const res = await fetch(`${path}`);
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error('Error');
        }
    }
    
    // getSWApi = (path) => {
    //     fetch(`https://swapi.dev/api/${path}`)
    //     .then(res => res.json())
    //     .catch(console.log('Error'))
    // }


    // getSome = (path) => {
    //     return this.getSWApi(path)
    // }

    getAllCharacters = path => {
        return this.getSWApi(path)
        .then(res => res.results);
    }

    transformArrayOfRefs(path, arrayName) {
		return new Promise((resolve, reject) => {
			this.getSWApi(path)
			.then((res) => {
				const dataObject = {
				...res,
				};
				const arrayOfPromises = res[arrayName].map((url) => {
				return this.getSWApi(url);
				});
				Promise.all(arrayOfPromises).then((res) => {
				const currentRes = res;
				dataObject[arrayName] = currentRes;
				resolve(dataObject);
				}).catch((e) => {
				reject(`неправильный url`);
				});
			}).catch((e) => {
				reject(e);
			});
		});
	}

    get10TransformedPeoples(path) {
        return new Promise((resolve, reject) => {
            this.getAllCharacters(path)
            .then((res) => {
                const dataArray = [...res];
                let arrayOfPromises = [];
                    dataArray.forEach((people, i) =>{
                    if (!people.species.length) {
                        people.species = ["https://swapi.dev/api/species/1/"];
                    }
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
                })
            })
        })
    }

    // getSome = async (path) => {
    //     const res = await this.getSWApi(path);
    //     return res;
    // }


    // getAllCharacters = async (path) => {
    //     const res = await this.getSWApi(path);
    //     return res.results;
    // }

    


}

export default SWService;

