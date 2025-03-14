interface CardProps {
    imageUrl: string;
    title: string;
    description: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ imageUrl, title, description, onClick }) => {
    return (
        <div 
        className="w-full max-w-sm bg-darkmode-secondary rounded-lg shadow-md overflow-hidden card cursor-pointer"
        onClick={onClick}
        >
            <img 
                src={imageUrl}
                alt={title} 
                className="w-full h-48 object-cover object-center p-4 mix-blend-multiply"
            />
            <div className="p-4">
                <h2 className="text-xl font-bold text-complementary">{title}</h2>
                <p className="text-complementary">{description}</p>
            </div>
        </div>
    )
}