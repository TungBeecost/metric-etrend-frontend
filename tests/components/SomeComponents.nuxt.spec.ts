import { it, expect } from "vitest";
import type { Component } from "vue";
// ---cut---
// tests/components/SomeComponents.nuxt.spec.ts
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { SomeComponent } from "#components";
declare module "#components" {
  export const SomeComponent: Component;
}

it("can mount some component", async () => {
  const component = await mountSuspended(SomeComponent);
  expect(component.text()).toMatchInlineSnapshot('"This is an auto-imported component"');
});
