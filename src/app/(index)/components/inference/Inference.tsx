"use client";
import React from "react";
import { useInference } from "../../lib/hooks/useInference";
import { useSetupStore } from "../../lib/store";
import { EntitiesResult } from "../EntitiesResult";
import RecognizeEntitiesButton from "../RecognizeEntitiesButton";
import Tag from "../Tag";
import { DomainDefinition } from "./DomainDefinition";
import ExampleQueries from "./ExampleQueries";
import { MissingSetupAlert } from "./MissingSetupAlert";
import ResultAlert from "../ResultAlert";

const Inference: React.FC = () => {
  const {
    query,
    setQuery,
    result,
    isLoading,
    entities,
    buttonState,
    handleSubmit,
    selectedLLM,
    jsonSchema,
    task,
  } = useInference();

  const showAlert = !selectedLLM || !jsonSchema;
  const { domainDefinition, setDomainDefinition } = useSetupStore();
  const isOutOfDomain = task === "out_of_domain";

  const handleSelectExampleQuery = (exampleQuery: string) => {
    setQuery(exampleQuery);
  };

  const handleSelectDomainDefinition = (definition: string) => {
    setDomainDefinition(definition);
  };

  if (showAlert) {
    return <MissingSetupAlert />;
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-start items-center space-x-2">
        <Tag text={selectedLLM} />
        {task && <Tag text={task} />}
      </div>
      {isOutOfDomain && (
        <DomainDefinition
          handleSelectDomainDefinition={handleSelectDomainDefinition}
          domainDefinition={domainDefinition}
          setDomainDefinition={setDomainDefinition}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Query
          </label>
          {task && (
            <ExampleQueries
              task={task}
              onSelectQuery={handleSelectExampleQuery}
            />
          )}
          <textarea
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-3 pr-3 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            placeholder="Enter your content here"
          />
        </div>

        <RecognizeEntitiesButton
          isLoading={isLoading}
          buttonState={buttonState}
          disabled={
            isLoading ||
            !query ||
            buttonState !== "idle" ||
            (isOutOfDomain && !domainDefinition)
          }
        />
        {result && (
          <ResultAlert status={result.status} message={result.message} />
        )}
        {entities && <EntitiesResult entities={entities} />}
      </form>
    </div>
  );
};

export default Inference;
