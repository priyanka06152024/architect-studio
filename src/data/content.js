import project1 from "../assets/images/project1.avif";
import project2 from "../assets/images/project2.avif";
import project3 from "../assets/images/project3.avif";
import project4 from "../assets/images/project4.avif";
import project5 from "../assets/images/project5.avif";
import project6 from "../assets/images/project6.avif";

import electric from "../assets/images/electric.avif";
import construction from "../assets/images/construction.avif";
import constructionDrawing from "../assets/images/constructionDrawing.avif";
import pumbling from "../assets/images/pumbling.avif";
import service from "../assets/images/service.jpg";
import serviceLS from "../assets/images/serviceLS.avif";
import img3d from "../assets/images/3dand2d.avif";





export const projects = [
  { title: 'Courtyard Residence', type: 'Residential', year: '2025', image:project1  },
  { title: 'The Quiet House', type: 'Residential', year: '2024', image: project2 },
  { title: 'Urban Workspace', type: 'Commercial', year: '2024', image: project3 },
  { title: 'Warm Minimal Living', type: 'Interior', year: '2023', image: project4 },
  { title: 'Modern Residence', type: 'Residential', year: '2023', image: project5 },
  { title: 'Material & Light', type: 'Interior', year: '2022', image: project6 },
]

export const services = [
  {
    number: "01",
    title: "Architecture & Planning",
    description: "Thoughtful architectural concepts shaped around your lifestyle, site and vision.",
    category: "Design & Planning",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "02",
    title: "Structural Design",
    description: "Practical structural planning focused on stability, safety and functionality.",
    category: "Engineering",
    image:service
  },
  {
    number: "03",
    title: "Landscape Design",
    description: "Outdoor spaces, gardens and greenery planned to complement the architecture.",
    category: "Outdoor Spaces",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "04",
    title: "2D & 3D Design",
    description: "Detailed plans and realistic visualisations to help you see your space before it is built.",
    category: "Visualisation",
    image: img3d
             },
  {
    number: "05",
    title: "Front Elevation",
    description: "Distinctive facades that balance proportion, materials and architectural character.",
    category: "Exterior Design",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "06",
    title: "Interior Design",
    description: "Considered interiors with carefully selected finishes, lighting and spatial planning.",
    category: "Interior Spaces",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "07",
    title: "Interior & Exterior",
    description: "A cohesive design approach connecting indoor comfort with exterior character.",
    category: "Complete Design",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "08",
    title: "Construction",
    description: "Construction services planned around project requirements and execution needs.",
    category: "Build & Execute",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "09",
    title: "Construction with Material",
    description: "Construction solutions with materials included, subject to the agreed project scope.",
    category: "Material & Execution",
    image:
      "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?auto=format&fit=crop&w=1000&q=85",
  },
  {
    number: "10",
    title: "Architectural Drawings",
    description: "Clear, detailed drawings to support design coordination and project execution.",
    category: "Technical Drawings",
    image: constructionDrawing  },
  {
    number: "11",
    title: "Plumbing",
    description: "Plumbing layouts and service coordination tailored to the building requirements.",
    category: "Building Services",
    image:pumbling
  },
  {
    number: "12",
    title: "Electrical Design",
    description: "Electrical planning for lighting, power points and everyday building needs.",
    category: "Building Services",
    image:electric  },
];


export const testimonials = [
  {
    quote:
      "The team listened carefully to what we needed and translated it into a home that feels both practical and personal. Every space feels thoughtfully designed.",
    name: "Residential Client",
    meta: "Aligarh · Home design",
  },
  {
    quote:
      "Their thoughtful planning and clear communication made the entire design process feel much easier to navigate. The final design reflected our vision beautifully.",
    name: "Commercial Client",
    meta: "Aligarh · Commercial project",
  },
  {
    quote:
      "We appreciated the attention to detail and the balance between aesthetics, comfort and everyday functionality. The interiors feel elegant without being overwhelming.",
    name: "Interior Client",
    meta: "Aligarh · Interior design",
  },
  {
    quote:
      "From the initial consultation to the design development, the process felt organised and considered. Our requirements were understood at every stage.",
    name: "Architecture Client",
    meta: "Aligarh · Architectural consultation",
  },
  {
    quote:
      "The layout planning helped us understand how the spaces could work together. The design made better use of the available area while keeping our needs in focus.",
    name: "Planning Client",
    meta: "Aligarh · Space planning",
  },
  {
    quote:
      "We wanted a contemporary space that would remain functional for years to come. The design approach brought together a clean aesthetic and practical thinking.",
    name: "Property Owner",
    meta: "Aligarh · Residential architecture",
  },
  {
    quote:
      "The team gave careful thought to the look, flow and usability of our space. Their structured approach helped us move forward with greater clarity.",
    name: "Business Owner",
    meta: "Aligarh · Commercial architecture",
  },
  {
    quote:
      "The design discussions helped us refine our ideas and make more confident decisions. We valued the attention given to the small details.",
    name: "Homeowner",
    meta: "Aligarh · House design & planning",
  },
  {
    quote:
      "A considered approach to design, clear communication and a focus on functionality made the experience feel professional from the beginning.",
    name: "Project Client",
    meta: "Aligarh · Design & execution",
  },
];


export const teamMembers = [
{
name: "Sudhir Kumar",
role: "Founder & Principal Architect",
image: "/images/team/sudhir-kumar.webp",
number: "01",
},
{
name: "Team Member Two",
role: "Senior Architect",
image: "/images/team/architect-two.webp",
number: "02",
},
{
name: "Team Member Three",
role: "Interior Designer",
image: "/images/team/designer.webp",
number: "03",
},
{
name: "Team Member Four",
role: "Design & Planning",
image: "/images/team/designer-two.webp",
number: "04",
},
];


