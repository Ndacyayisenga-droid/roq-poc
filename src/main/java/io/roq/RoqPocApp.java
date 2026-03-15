package io.roq;

import jakarta.enterprise.context.ApplicationScoped;

/**
 * Minimal bean so this module has a standard Maven/Quarkus layout.
 * Roq and Web Bundler need a project root; it is resolved when the build produces classes/resources.
 */
@ApplicationScoped
public class RoqPocApp {
}
