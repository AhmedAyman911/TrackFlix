import {SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
export default function Signin() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignedOut>
                <SignIn />
            </SignedOut>
            <SignedIn>
                <h1>Welcome!</h1>
                <UserButton />
            </SignedIn>
        </div>
    );
}
