import React from "react";
import { Button } from "@/components/ui/button";

const EXAMPLE_DOMAIN_DEFINITIONS = [
  `Domain: E-Commerce Multimedia Products
Description: Queries related to searching, comparing, purchasing, or inquiring about digital and physical multimedia entertainment products.

Includes:
- Movies, TV shows, and video content (DVDs, Blu-rays, digital downloads, streaming)
- Music (CDs, vinyl records, digital albums, streaming services)
- Video games (console games, PC games, mobile games, gaming accessories)
- E-books, audiobooks, and digital publications
- Multimedia software and applications (editing tools, players, converters)

Query attributes:
- Product specifications (resolution, format, compatibility, platforms)
- Release dates and availability
- Pricing information and deals
- Reviews and ratings
- Comparison between similar products
- Technical requirements or specifications
- Subscription or service-related inquiries for multimedia content`,
];

interface ExampleDomainDefinitionsProps {
  onSelectDefinition: (definition: string) => void;
}

const ExampleDomainDefinitions: React.FC<ExampleDomainDefinitionsProps> = ({
  onSelectDefinition,
}) => {
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        {EXAMPLE_DOMAIN_DEFINITIONS.map((definition, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            type="button"
            onClick={() => onSelectDefinition(definition)}
            className="text-xs"
          >
            Example {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ExampleDomainDefinitions;
