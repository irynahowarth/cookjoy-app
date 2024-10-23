import { createServer, Model, Response } from "miragejs";

createServer({
    models: {
        recipes: Model,
        users: Model
    },
    seeds(server){
        server.create("recipe", 
            {
                id: "1",
                image: "https://img.spoonacular.com/recipes/73420-312x231.jpg", 
                title: "Apple Or Peach Strudel",
                servings: 2,
                readyInMinutes: 45,
                cookingMinutes: 25,
                preparationMinutes: 20,
                dishTypes: ["dessert"],
                instructions: "",
                ingredients:[
                    {name: "apple", amount:3, unit: "items"},
                    {name: "butter", amount:100, unit: "gramms"},
                    {name: "flour", amount:300, unit: "gramms"},
                    {name: "eggs", amount:2, unit: "items"},
                    {name: "sugar", amount:50, unit: "grams"},
                ],
                createId: "111",
            })
            server.create("recipe", 
            {
                id: "2",
                image: "https://img.spoonacular.com/recipes/641803-312x231.jpg", 
                title: "Easy & Delish! ~ Apple Crumble",
                servings: 2,
                readyInMinutes: 45,
                cookingMinutes: 25,
                preparationMinutes: 20,
                dishTypes: ["dessert"],
                instructions: "",
                ingredients:[
                    {name: "apple", amount:3, unit: "items"},
                    {name: "butter", amount:0.75, unit: "sticks"},
                    {name: "flour", amount:300, unit: "gramms"},
                    {name: "eggs", amount:2, unit: "items"},
                    {name: "sugar", amount:50, unit: "grams"},
                    {name: "zest of lemon", amount:1, unit: "tbsp"},
                ],
                createId: "111",
            }),
            server.create("recipe", 
                {
                    id: "3",
                    image: "https://img.spoonacular.com/recipes/632252-312x231.jpg", 
                    title: "Alouette® Stuffed Mushroom Caps",
                    servings: 2,
                    readyInMinutes: 45,
                    cookingMinutes: 25,
                    preparationMinutes: 20,
                    dishTypes: ["dinner"],
                    instructions: "",
                    ingredients:[
                        {name: "mushrooms", amount:3, unit: "items"},
                        {name: "butter", amount:0.75, unit: "sticks"},
                        {name: "flour", amount:300, unit: "gramms"},
                        {name: "eggs", amount:2, unit: "items"},
                        {name: "sugar", amount:50, unit: "grams"},
                        {name: "zest of lemon", amount:1, unit: "tbsp"},
                    ],
                    createId: "222",
                }),
        server.create("user",{id:"111", email:"user@google.com", password:"12345", name:"Jane"})

    },
    routes(){
        this.namespace = "/api/v1/"
        this.logging = false
        this.passthrough("https://firestore.googleapis.com/**")
        this.passthrough()

        this.get("/recipes",(schema, request)=>{
            return schema.recipes.all()
        })

        this.get("/recipes/:id",(schema, request)=>{
            const id = request.params.id
            return schema.recipes.find(id)
        })

        this.get("/create/recipes", (schema, request)=>{
            return schema.recipes.where({createId: "111"})
        })

        this.get("/create/recipes/:id", (schema, request)=>{
            const id = request.params.id
            return schema.recipes.findBy({id, createId: "111"})
        })

        this.post("/login", (schema, request)=>{
            const {email, password} = JSON.parse(request.requestBody)
            const foundUser = schema.users.findBy({email, password})
            if(!foundUser){
                return new Response(401, {}, { message: "There is no user with your email and password!"})
            }
            foundUser.password = undefined
            return {
                user: foundUser,
                token: "This is your Tokens"
            }
        })
    }
})
