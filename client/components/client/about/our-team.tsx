import Image from "next/image";

export default function Team() {
    const team = [
        {
            name: "MIKKIE RURK",
            image: "/demo/team1.jpg",
            alt: "Portrait of Mikkie Rurk, a chef in a white uniform and chef's hat"
        },
        {
            name: "SARA RAZER",
            image: "/demo/team2.jpg",
            alt: "Portrait of Sara Razer, a chef in a white uniform and chef's hat"
        },
        {
            name: "DAVID JACOB",
            image: "/demo/team3.jpg",
            alt: "Portrait of David Jacob, a chef in a white uniform and chef's hat"
        },
        {
            name: "MORGAN DUTCH",
            image: "/demo/team4.jpg",
            alt: "Portrait of Morgan Dutch, a chef in a white uniform and chef's hat"
        }
    ];

    return (
        <div className="w-full">
            <div className="text-center py-10 px-4  max-w-7xl mx-auto">
                <h2 className="text-2xl font-semibold mb-2">OUR TEAM</h2>
                <p className="text-gray-600 mb-10">Each member of our team is a specialist in his or her field</p>
                <div className="flex flex-wrap justify-center">
                    {team.map((member, index) => (
                        <div key={index} className="p-4 text-center w-full md:w-1/2 lg:w-1/4">
                            <div className="border-2 border-gray-600 p-4 hover:border-yellow-400 ">
                                <Image src={member.image} alt={member.alt} className="w-full h-auto -mt-9" width={250} height={350} />
                                <h3 className="font-semibold">{member.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}   
