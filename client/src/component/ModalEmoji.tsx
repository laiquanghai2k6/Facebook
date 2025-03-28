import { Angrys, Hahas, Likes, Loves, PostShareType, PostType, Sads, Wows } from "../slices/postSlice";
import CloseButton from "./button/CloseButton";
import Hr from "./Hr";
import UserItemEmoji from "./UserItemEmoji";

type ModalEmojiProps = {
    setModalEmoji: Function
    post: PostType | PostShareType
}
const emojis = ['like', 'love', 'haha', 'wow', 'sad', 'angry']

const ModalEmoji = ({ setModalEmoji, post }: ModalEmojiProps) => {

    return (
        <div>
            <div className="modal-emoji-container">
                {/* {shareMutation.isPending && <Spinner />} */}
                <div className="modal-emoji-post-box">
                    <p style={{ alignSelf: 'center', top: '0', position: 'absolute', marginTop: '2vh', fontSize: '2.5vh', justifySelf: 'flex-start', fontWeight: 'bold' }}>Cảm xúc</p>
                    <Hr />
                    <CloseButton onClick={() => setModalEmoji(false)} />
                    {emojis.map((emoji) => {


                        return (
                            (post[emoji as keyof PostType] as Wows | Likes | Hahas | Sads | Loves | Angrys).userId.map((u, i) => (
                                <UserItemEmoji userId={u} key={i} emoji={emoji} />

                            ))
                        )
                    })}
                   
                </div>
            </div>
        </div>
    );
}

export default ModalEmoji;