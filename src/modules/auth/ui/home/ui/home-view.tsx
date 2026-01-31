"use client"

import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation';

export const HomeView = () => {
    const router = useRouter();
    const {data: session} = authClient.useSession();
    if(!session){
        return <div>Please login to view this page</div>
    };

    return (
        <div>
        <div>Welcome, {session.user.name}</div>
        <Button onClick={()=>authClient.signOut({
            fetchOptions: {
                onSuccess: () => router.push("/sign-in")
            }
        })
        }>
         Sign Out
        </Button>
        </div>
    )
}
