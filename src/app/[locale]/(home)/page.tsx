import { getMyBlogs } from "@/server/admin/blogService";
import { HomePage } from "@/components/pages/Home";

const Home = async () => {
    const { data: blogs } = await getMyBlogs()

    return (
        <HomePage
            blogs={blogs}
        />
    )
}

export default Home;