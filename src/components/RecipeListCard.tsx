import { Link, useSearchParams } from 'react-router-dom'

type Props = {}

export default function RecipeListCard({recipe}: Props) {
    const [searchParams, setSearchParams] = useSearchParams();
    const recipeTime = recipe.createdAt.toDate().toUTCString('en-gb', { weekday:"long", year:"numeric", month:"short", day:"numeric"}).slice(0,-12)
    const userPhoto =  recipe.user.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div className="relative flex flex-col rounded-3xl bg-white p-2 shadow-md shadow-black/5 ring-1 ring-black/5">
        
        <img 
            src="https://images.unsplash.com/photo-1657313938000-23c4322dbe22?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt={`Recipe ${recipe.title} photo`}
            className="aspect-[3/2] w-full rounded-2xl object-cover"/>
        
        <div className="flex flex-1 flex-col p-8">
            <div className="text-sm/7 text-gray-700">{recipeTime}</div>
        
        <div className="mt-2 text-base/7 font-medium">
            <Link to={recipe.id}  aria-label={`View details for ${recipe.title}`}>
                <span className="absolute inset-0"></span>
                {recipe.title}
            </Link>
        </div>
        <div className="mt-2 flex-1 text-sm/6 text-gray-500">
            {recipe.description}
        </div>
        <div className="mt-6 flex items-center gap-3">
            <img src={userPhoto} alt={recipe.user.name} className='aspect-square size-6 rounded-full object-cover'/>
            <div className="text-sm/5 text-gray-700">{recipe.user.name}</div>
        </div>
        
        {recipe.dishTypes.length > 0 && 
        <div className="flex flex-wrap gap-2 mt-6">
            {recipe.dishTypes.map((dish,index)=>(
                <button  
                key={dish+index}
                onClick={()=>setSearchParams({ type: dish })}
                className='z-0 rounded-full border border-dotted border-gray-300 bg-gray-50 px-2 text-sm/6 font-medium text-gray-500'
                >{dish[0].toUpperCase()+dish.slice(1)}</button>
            ))}
        </div>}
        </div>

    </div>
  )
}