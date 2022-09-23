import { CivicProfile, Profile } from "@civic/profile"
import styles from "../styles/Profile.module.css"

export async function getServerSideProps(context) {
    const profile: Profile = await CivicProfile.get(context.query.address);

    return {
      props: {
        profile: {
            ...profile,
            getPasses: null,
            getLinkedPublicKeys: null,
        }
      }, 
    }
}

export default function Page(props) {
    return (
        <div className={styles.container}>
            <form action="/profile" method='get'>
                <input
                    className={styles.input}
                    placeholder='Enter Address'
                    name='address' 
                    value={props.profile.address}
                />
            </form>

            <pre className={styles.code}>
                {JSON.stringify(props.profile, null, 2)}
            </pre>
        </div>
    )
}