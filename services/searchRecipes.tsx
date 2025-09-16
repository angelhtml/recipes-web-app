"use cache"

export default async function SearchRecipes(i: string){
    try {
          const response = await fetch(`${process.env.URL}api/search`, { // Target your API endpoint
            method: 'POST',
            next: {revalidate: 1500},
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ search: i }), // Send data as JSON
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if(i != ""){
            return data
          }
          else{
            return []
          }
          
          // Handle successful response, e.g., clear form, show success message
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle errors, e.g., show error message to user
        }
}