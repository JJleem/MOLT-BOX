import React from "react";
import "../../styles/interactionSlide.scss";
import "../../assets/interactionSlide/0.png";

interface SlideItemProps {
  index: number;
  activePage: number;
  itemsPerPage: number;
}

const names = [
  "James Smith",
  "Mary Johnson",
  "John Williams",
  "Patricia Brown",
  "Robert Jones",
  "Jennifer Garcia",
  "Michael Miller",
  "Linda Davis",
  "William Rodriguez",
  "Elizabeth Martinez",
  "David Hernandez",
  "Barbara Lopez",
  "Richard Gonzalez",
  "Susan Wilson",
  "Joseph Anderson",
  "Jessica Thomas",
  "Thomas Taylor",
  "Sarah Moore",
  "Charles Jackson",
  "Karen Martin",
  "Christopher Lee",
  "Nancy Perez",
  "Daniel Thompson",
  "Lisa White",
  "Matthew Harris",
  "Betty Sanchez",
  "Anthony Clark",
  "Margaret Ramirez",
  "Mark Lewis",
  "Sandra Robinson",
  "Donald Walker",
  "Ashley Young",
  "Steven Allen",
  "Kimberly King",
  "Paul Wright",
  "Emily Scott",
  "Andrew Torres",
  "Donna Nguyen",
  "Joshua Hill",
  "Michelle Flores",
];

const mockups = [
  {
    h3: "Innovative Solutions",
    p: "Discover innovative solutions for modern challenges in technology and design.",
    h5: "2025-01-01",
  },
  {
    h3: "Creative Insights",
    p: "Our creative insights drive breakthrough performance and revolutionary change.",
    h5: "2025-01-02",
  },
  {
    h3: "Cutting-Edge Technology",
    p: "Experience the future of technology with our cutting-edge products and services.",
    h5: "2025-01-03",
  },
  {
    h3: "Seamless Integration",
    p: "Seamlessly integrate advanced systems for unparalleled efficiency.",
    h5: "2025-01-04",
  },
  {
    h3: "Dynamic Performance",
    p: "Achieve dynamic performance and boost productivity with state-of-the-art tools.",
    h5: "2025-01-05",
  },
  {
    h3: "Empowering Innovation",
    p: "Empowering innovation through collaborative design and agile methodologies.",
    h5: "2025-01-06",
  },
  {
    h3: "Global Reach",
    p: "Expand your global reach with our comprehensive strategies and solutions.",
    h5: "2025-01-07",
  },
  {
    h3: "Visionary Leadership",
    p: "Embrace visionary leadership to transform industries and create lasting impact.",
    h5: "2025-01-08",
  },
  {
    h3: "Future Ready",
    p: "Be future ready with innovative approaches and a forward-thinking mindset.",
    h5: "2025-01-09",
  },
  {
    h3: "Strategic Growth",
    p: "Drive strategic growth with tailored business solutions and market expansion strategies.",
    h5: "2025-01-10",
  },
  {
    h3: "Next-Gen Ideas",
    p: "Explore next-generation ideas that redefine industry standards and practices.",
    h5: "2025-01-11",
  },
  {
    h3: "Revolutionary Design",
    p: "Our revolutionary design philosophy merges aesthetics with functionality.",
    h5: "2025-01-12",
  },
  {
    h3: "Innovate and Inspire",
    p: "Innovate and inspire with creative solutions that exceed expectations.",
    h5: "2025-01-13",
  },
  {
    h3: "Agile Development",
    p: "Leverage agile development for faster, more efficient project delivery.",
    h5: "2025-01-14",
  },
  {
    h3: "Digital Transformation",
    p: "Accelerate your digital transformation journey with expert guidance.",
    h5: "2025-01-15",
  },
  {
    h3: "User-Centric Approach",
    p: "Focus on a user-centric approach that prioritizes customer experience.",
    h5: "2025-01-16",
  },
  {
    h3: "Data-Driven Decisions",
    p: "Make data-driven decisions with insights powered by advanced analytics.",
    h5: "2025-01-17",
  },
  {
    h3: "Scalable Solutions",
    p: "Implement scalable solutions that grow with your business demands.",
    h5: "2025-01-18",
  },
  {
    h3: "Innovative Strategies",
    p: "Craft innovative strategies to secure long-term success.",
    h5: "2025-01-19",
  },
  {
    h3: "Empowering Teams",
    p: "Empower your teams with tools and resources that drive collaboration.",
    h5: "2025-01-20",
  },
  {
    h3: "Sustainable Growth",
    p: "Achieve sustainable growth by integrating eco-friendly business practices.",
    h5: "2025-01-21",
  },
  {
    h3: "Innovative Culture",
    p: "Foster a culture of innovation that embraces change and continuous improvement.",
    h5: "2025-01-22",
  },
  {
    h3: "Enhanced Efficiency",
    p: "Boost productivity with streamlined processes and enhanced efficiency.",
    h5: "2025-01-23",
  },
  {
    h3: "Cutting-Edge Research",
    p: "Stay ahead with cutting-edge research and pioneering technological advances.",
    h5: "2025-01-24",
  },
  {
    h3: "Seamless Connectivity",
    p: "Experience seamless connectivity across platforms for improved workflow.",
    h5: "2025-01-25",
  },
  {
    h3: "Modern Aesthetics",
    p: "Our modern aesthetics redefine visual appeal with clean, innovative design.",
    h5: "2025-01-26",
  },
  {
    h3: "Innovative Workflows",
    p: "Streamline your operations with innovative workflows and automation.",
    h5: "2025-01-27",
  },
  {
    h3: "Customer First",
    p: "Place customers at the heart of your business with exceptional service.",
    h5: "2025-01-28",
  },
  {
    h3: "Dynamic Interfaces",
    p: "Design dynamic interfaces that offer intuitive navigation and user engagement.",
    h5: "2025-01-29",
  },
  {
    h3: "Future Innovations",
    p: "Explore innovations that set the stage for groundbreaking developments.",
    h5: "2025-01-30",
  },
  {
    h3: "Robust Infrastructure",
    p: "Build robust infrastructure to support scalable growth and performance.",
    h5: "2025-01-31",
  },
  {
    h3: "Integrated Solutions",
    p: "Deliver integrated solutions that merge technology with business objectives.",
    h5: "2025-02-01",
  },
  {
    h3: "Pioneering Research",
    p: "Drive pioneering research that transforms industries and redefines standards.",
    h5: "2025-02-02",
  },
  {
    h3: "Smart Automation",
    p: "Harness the power of smart automation to reduce workload and boost efficiency.",
    h5: "2025-02-03",
  },
  {
    h3: "Effortless Navigation",
    p: "Ensure effortless navigation with user-friendly design and clear structure.",
    h5: "2025-02-04",
  },
  {
    h3: "Reimagined Experience",
    p: "Reimagine user experience with creative design and interactive elements.",
    h5: "2025-02-05",
  },
  {
    h3: "Innovative Collaboration",
    p: "Foster collaboration through teamwork and cutting-edge communication tools.",
    h5: "2025-02-06",
  },
  {
    h3: "Transformative Impact",
    p: "Create transformative impact with solutions that drive real-world change.",
    h5: "2025-02-07",
  },
  {
    h3: "Elevated Standards",
    p: "Elevate your standards with high-quality products and exceptional service.",
    h5: "2025-02-08",
  },
  {
    h3: "Visionary Future",
    p: "Envision a future where innovation and creativity lead the way.",
    h5: "2025-02-09",
  },
];

const SlideItem: React.FC<SlideItemProps> = ({
  index,
  activePage,
  itemsPerPage,
}) => {
  // 계산: 현재 페이지에서 보여져야 하는 아이템 인덱스 범위
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = activePage * itemsPerPage - 1;
  const isActive = index >= startIndex && index <= endIndex;

  // 인덱스에 따라 이름 배열에서 선택 (순환 방식)
  const name = names[index % names.length];

  // 모킹 데이터 배열에서 인덱스에 따라 선택 (순환 방식)
  const mockup = mockups[index % mockups.length];

  return (
    <div className="SlideItem" style={{ opacity: isActive ? 1 : 0.2 }}>
      <img
        className="img"
        src={`src/assets/interactionSlide/${index}.png`}
        alt="picture"
      />
      <div className="desc">
        <h3>{mockup.h3}</h3>
        <span>{name}</span>
        <p>{mockup.p}</p>
        <h5>{mockup.h5}</h5>
      </div>
    </div>
  );
};

export default SlideItem;
