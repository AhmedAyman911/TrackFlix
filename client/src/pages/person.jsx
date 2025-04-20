import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActorInfo, getActorCridits } from "../api/tmbd";
import MovieCard from "../componants/card";
import Loading from "../skeletonPages/detailsSkeleton";

const ActorPage = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [titles, setTitles] = useState([]);
    const [loading, setLoading] = useState(true);

    const calculateAge = (birthday, deathday = null) => {
        if (!birthday) return null;
        const birthDate = new Date(birthday);
        const endDate = deathday ? new Date(deathday) : new Date();
        let age = endDate.getFullYear() - birthDate.getFullYear();
        const monthDiff = endDate.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };



    useEffect(() => {
        window.scrollTo(0, 0);
        const loadActor = async () => {
            try {
                setLoading(true);
                const actorData = await getActorInfo(id);
                const titlesData = await getActorCridits(id);
                console.log(titlesData)
                setActor(actorData);
                setTitles(
                    (titlesData || [])
                        .filter((title, index, self) => {
                            const name = (title.title || title.name || '').toLowerCase();
                            const bannedKeywords = ['show', 'late night', 'tonight', 'saturday night live', 'talk', 'jimmy kimmel', 'honest trailers', 'top gear','golden globe awards'];
                            const isBanned = bannedKeywords.some(keyword => name.includes(keyword));
                            if (isBanned) return false;
                            return index === self.findIndex((t) => (t.title || t.name) === (title.title || title.name));
                        })
                        .sort((a, b) => b.popularity - a.popularity)
                        .slice(0, 20)
                );
            } catch (error) {
                console.error("Failed to load actor:", error);
            } finally {
                setLoading(false);
            }
        };

        loadActor();
    }, [id]);

    if (loading) return <Loading />;

    if (!actor) return <div className="text-center py-20 text-xl text-gray-500">Actor not found.</div>;

    console.log(titles)
    return (
        <div className="py-24 px-6 md:px-20 max-w-screen-xl mx-auto">

            {/* Top Section */}
            <div className="relative z-10 flex items-center justify-left h-full">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full transition duration-100 animate-fade-in">

                    {/* Actor Image */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                            alt={actor.name}
                            className="w-40 md:w-72 rounded-xl shadow-lg object-cover"
                        />
                    </div>
                    <div className="flex-1 text-left">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">{actor.name}</h1>

                        <p className="text-sm dark:text-yellow-300 text-yellow-700 mb-1">
                            🎂 {actor.birthday?.slice(0, 4)}
                            {actor.deathday ? ` - ${actor.deathday.slice(0, 4)} (Age ${calculateAge(actor.birthday, actor.deathday)})`
                                : ` (Age ${calculateAge(actor.birthday)})`}
                            {actor.place_of_birth && ` | 📍 ${actor.place_of_birth}`}
                        </p>

                        <h2 className="text-2xl font-bold pb-2 dark:text-white text-left">Biography:</h2>

                        <p className="text-md dark:text-gray-300 md:text-gray-300 text-gray-700">
                            {actor.biography || "No biography available."}
                        </p>
                    </div>

                </div>
            </div>

            <h2 className="text-3xl font-bold py-8 dark:text-white text-left">Known For:</h2>
            {titles.length > 0 ? (
                <div className="flex flex-wrap md:justify-left justify-center gap-5 md:gap-6">
                    {titles.map((title) => (
                        <MovieCard key={title.id} movie={title} mediaType={title.media_type} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No known titles.</p>
            )}

        </div>
    );
};

export default ActorPage;
