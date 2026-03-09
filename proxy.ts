import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuthUser } from './lib/dal'

export async function proxy(request: NextRequest) {
    const user = await getAuthUser()
    
    if(user?._id){
        return NextResponse.next();
    }else{
        return NextResponse.redirect(new URL('/login', request.url))   
    }
} 
 
export const config = {
  matcher: '/admin/:slug*',
}