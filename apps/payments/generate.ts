import { generate } from "../../openapi-generator/generator";

generate(["./openapi/bff-openapi.yaml", "./openapi/ext-openapi.yaml"]);
