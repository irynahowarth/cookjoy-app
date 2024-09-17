import { createServer, Model } from "miragejs";

createServer({
    models: {
        recipes: Model,
    },
    seeds(server){
        server.create('recipe', 
            {
                id: '1',
                image: "https://img.spoonacular.com/recipes/73420-312x231.jpg", 
                title: "Apple Or Peach Strudel",
                servings: 2,
                readyInMinutes: 45,
                cookingMinutes: 25,
                preparationMinutes: 20,
                dishTypes: ['dessert'],
                instructions: "",
                ingredients:[
                    {name: 'apple', amount:3, unit: 'items'},
                    {name: 'butter', amount:100, unit: 'gramms'},
                    {name: 'flour', amount:300, unit: 'gramms'},
                    {name: 'eggs', amount:2, unit: 'items'},
                    {name: 'sugar', amount:50, unit: 'grams'},
                ],
            })
            server.create('recipe', 
            {
                id: '2',
                image: "https://img.spoonacular.com/recipes/641803-312x231.jpg", 
                title: "Easy & Delish! ~ Apple Crumble",
                servings: 2,
                readyInMinutes: 45,
                cookingMinutes: 25,
                preparationMinutes: 20,
                dishTypes: ['dessert'],
                instructions: "",
                ingredients:[
                    {name: 'apple', amount:3, unit: 'items'},
                    {name: 'butter', amount:0.75, unit: 'sticks'},
                    {name: 'flour', amount:300, unit: 'gramms'},
                    {name: 'eggs', amount:2, unit: 'items'},
                    {name: 'sugar', amount:50, unit: 'grams'},
                    {name: 'zest of lemon', amount:1, unit: 'tbsp'},
                ],
            }
        )

    },
    routes(){
        this.namespace = 'api'
        this.logging = false

        this.get('/recipes',(schema, request)=>{
            return schema.recipes.all()
        })

        this.get('/recipes/:id',(schema, request)=>{
            const id = request.params.id
            return schema.recipes.find(id)
        })
    }
})
