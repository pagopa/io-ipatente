import { generate } from "../../openapi-generator/generate";

generate(["./openapi/bff-openapi.yaml", "./openapi/ext-openapi.yaml"]);
