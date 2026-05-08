import Layout from "../components/Layout";
 

function Dashboard() {

    return (
        <Layout title="Dashboard">

            <div className="cards">

                <div className="card gradient-blue">
                    <h3>Available Tiffins</h3>
                    <p>25</p>
                </div>

                <div className="card gradient-purple">
                    <h3>My Orders</h3>
                    <p>3</p>
                </div>

                <div className="card gradient-green">
                    <h3>Spent</h3>
                    <p>₹1,200</p>
                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;