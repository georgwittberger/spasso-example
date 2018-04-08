package io.github.georgwittberger.spasso.spassoresourceserver.example;

import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class ExampleController {
    @PreAuthorize("isAuthenticated()")
    @RequestMapping(path = "/example", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public Example example(Principal principal) {
        return new Example().text("Hello, " + principal.getName() + "!");
    }
}
