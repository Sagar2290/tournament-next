"use client"
import { Button} from "./ui/button";
import { useRouter } from 'next/navigation';

export default function RediractButton(props: any) {
    const router = useRouter()

    return (
        <div>
            <Button onClick={router.push(props.pageRedirect)} {...props} ></Button>
        </div>
    );

}

