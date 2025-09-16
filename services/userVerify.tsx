"use cache"

export default async function UserVerify(token: string | Storage){
    try{
         const response = await fetch(`${process.env.URL}api/verify`, { // Target your API endpoint
            method: 'POST',
            next: {revalidate: 120},
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }), // Send data as JSON
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          return data
    }
    catch(err){
        console.log(err)
    }
}