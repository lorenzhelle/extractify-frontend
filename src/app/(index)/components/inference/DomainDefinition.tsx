import React from "react";
import ExampleDomainDefinitions from "./ExampleDomainDefinitions";

interface Props {
  handleSelectDomainDefinition: (definition: string) => void;
  domainDefinition: string;
  setDomainDefinition: (definition: string) => void;
}

export const DomainDefinition: React.FC<Props> = ({
  handleSelectDomainDefinition,
  domainDefinition,
  setDomainDefinition,
}) => {
  return (
    <div>
      <label
        htmlFor="domainDefinition"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Domain Definition
      </label>
      <ExampleDomainDefinitions
        onSelectDefinition={handleSelectDomainDefinition}
      />
      <textarea
        id="domainDefinition"
        value={domainDefinition}
        onChange={(e) => setDomainDefinition(e.target.value)}
        className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        placeholder="Define your domain and entities, e.g.: Domain: Weather forecasting&#10;Entities: temperature (number), condition (string), location (string)"
        rows={4}
      />
      <p className="mt-1 text-xs text-gray-500">
        Specify the domain and describe which request are falling into this
        domain.
      </p>
    </div>
  );
};
