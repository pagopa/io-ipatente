import * as fs from "fs";
import SwaggerParser from "@apidevtools/swagger-parser";
import type { OpenAPIObject } from "openapi3-ts";
import {
  getHandlebars,
  generateZodClientFromOpenAPI,
} from "openapi-zod-client";

const main = async () => {
  const handlebars = getHandlebars();
  handlebars.registerHelper("is_zobject", (schema: string) =>
    schema.includes("z.object"),
  );

  const apiDocs = fs
    .readdirSync("./openapi", { withFileTypes: true })
    .map((item) => item.name);

  for (const doc of apiDocs) {
    const openApiDoc = (await SwaggerParser.parse(
      `./openapi/${doc}`,
    )) as OpenAPIObject;

    const fileName = doc.split(".")[0];
    await generateZodClientFromOpenAPI({
      openApiDoc,
      distPath: `./src/generated/${fileName}.ts`,
      handlebars,
      templatePath: fileName.includes("ext")
        ? "./template-ext.hbs"
        : "./template-bff.hbs",
      options: {
        withAlias: true,
        additionalPropertiesDefaultValue: false,
      },
    });
    console.log(`Done generating <src/generated/${fileName}.ts> !`);
  }
};

main();
