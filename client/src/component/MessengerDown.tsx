import { useDispatch, useSelector } from "react-redux";
import MessengerDownCard from "./MessengerDownCard";
import { RootState } from "../store/store";
import { useEffect, useRef } from "react";
import { cleatLast } from "../slices/messengerSlice";
type MessengerDownProps = {

}
export const throttle = (callback: Function, delay: number) => {
    let wait = false
    let lastArg: any = null
    return (...args: any) => {
        if (wait) {
            lastArg = args
            return;
        }
        callback(...args)
        wait = true;
        setTimeout(() => {
            if (lastArg == null) {
                wait = false
            } else {
                wait = false
                callback(...args)
                lastArg = null
            }
        }, delay)


    }
}

const MessengerDown: React.FC<MessengerDownProps> = () => {

    const messengerCard = useSelector((state: RootState) => state.messengerCard.messengerCard)
    const userOnline = useSelector((state: RootState) => state.messengerCard.userOnline)


    const messengerCardRef = useRef<number | null>(null)
    useEffect(() => {
        messengerCardRef.current = messengerCard.length
    }, [messengerCard])
    const remToPx = 20 * 16
    const dispatch = useDispatch()
    const GetWidth = () => {
        const width = window.innerWidth
        if (messengerCardRef.current) {
            if ((messengerCardRef.current) * remToPx >= 75 * (width / 100)) {
                dispatch(cleatLast())
            }
        }
    }
    useEffect(() => {
        window.addEventListener('resize',
            throttle(GetWidth, 300)
        )

        return () => {
            window.removeEventListener('resize', GetWidth)
        }
    }, [])
    // console.log('messengerdown:',messengerCard)
    return (
        <>
            {messengerCard.length > 0 && (<div className="messenger-down-container">
                {messengerCard.map((card, i) => {
                    return (

                        <MessengerDownCard userOnline={userOnline} card={card} key={`cardsdf${i}`} />
                    )

                })}

            </div>
            )}
        </>
    );
}

export default MessengerDown;