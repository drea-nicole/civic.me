import { CivicProfile, Profile } from "@civic/profile"
import { Connection, clusterApiUrl } from '@solana/web3.js';
import styles from "../styles/Profile.module.css"

export async function getServerSideProps(context) {
    const connection = new Connection(clusterApiUrl('mainnet-beta'));
    const profile: Profile = await CivicProfile.get(context.query.address, { solana: { connection } });
    const passes = await profile.getPasses();
    // [
    //   GatewayToken {
    //     issuingGatekeeper: PublicKey,
    //     gatekeeperNetwork: PublicKey,
    //     owner: PublicKey,
    //     state: 'ACTIVE',
    //     publicKey: PublicKey,
    //     programId: PublicKey,
    //     expiryTime: 1663038793
    //   }
    // ]

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