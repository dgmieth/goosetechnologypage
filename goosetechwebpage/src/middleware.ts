import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Pass the pathname to the not-found page via headers
  response.headers.set('x-pathname', request.nextUrl.pathname)
  
  return response
}

export const config = {
  matcher: ['/:path*'],
}
