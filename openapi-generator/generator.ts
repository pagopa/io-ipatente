import path from "path";
import type { OpenAPIObject } from "openapi3-ts";
import SwaggerParser from "@apidevtools/swagger-parser";
import {
  generateZodClientFromOpenAPI,
  getHandlebars,
} from "openapi-zod-client";

export const generate = async (apiDocs: string[]) => {
  const handlebars = getHandlebars();
  handlebars.registerHelper("is_zobject", (schema: string) =>
    schema.includes("z.object"),
  );

  for (const doc of apiDocs) {
    const openApiDoc = (await SwaggerParser.parse(doc)) as OpenAPIObject;
    const fileName = path.basename(doc).split(".")[0];

    await generateZodClientFromOpenAPI({
      distPath: `./src/generated/${fileName}.ts`,
      handlebars,
      openApiDoc,
      options: {
        additionalPropertiesDefaultValue: false,
        withAlias: true,
      },
      templatePath: fileName.includes("ext")
        ? `${__dirname}/template-ext.hbs`
        : `${__dirname}/template-bff.hbs`,
    });
    console.log(`Done generating <src/generated/${fileName}.ts> !`);
  }
};
