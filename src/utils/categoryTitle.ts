export function categoryTitle(categoryName :string) :string {
  
  if(categoryName.length === 1) 
    return categoryName.toUpperCase() + "s";
  
  const firstLetter = categoryName.charAt(0).toUpperCase()
  const rest = categoryName.slice(1).toLowerCase();

  return firstLetter + rest + "s";
}