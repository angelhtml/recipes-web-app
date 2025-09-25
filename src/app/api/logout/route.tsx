
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        console.log(token)

        return new Response(
            JSON.stringify({
                message: 'Logout',
                data: true,
            }),
            {
                status: 200,
                headers: {
                    'content-type': 'application/json',
                    'Set-Cookie': `token=; Path=/; Max-Age=0`,
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({}),
            {
                status: 400,
                headers: {
                    'content-type': 'application/json',
                },
            }
        );
    }
}