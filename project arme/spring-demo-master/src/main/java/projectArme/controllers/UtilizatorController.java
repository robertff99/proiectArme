package projectArme.controllers;


import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectArme.dtos.UtilizatorDTO;
import projectArme.dtos.UtilizatorDetailsDTO;
import projectArme.services.UtilizatorService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/utilizator")
public class UtilizatorController {

    private final UtilizatorService utilizatorService;

    @Autowired
    public UtilizatorController(UtilizatorService utilizatorService) {
        this.utilizatorService = utilizatorService;
    }

    @GetMapping()
    public ResponseEntity<List<UtilizatorDTO>> getUtilizators() {

        List<UtilizatorDTO> dtos = utilizatorService.findUtilizators();
        for (UtilizatorDTO dto : dtos) {
            Link utilizatorLink = linkTo(methodOn(UtilizatorController.class)
                    .getUtilizator(dto.getId())).withRel("utilizatorDetails");
            dto.add(utilizatorLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody UtilizatorDetailsDTO utilizatorDTO) {

        UUID utilizatorID = utilizatorService.insert(utilizatorDTO);
        return new ResponseEntity<>(utilizatorID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UtilizatorDetailsDTO> getUtilizator(@PathVariable("id") UUID utilizatorId) {
        UtilizatorDetailsDTO dto = utilizatorService.findUtilizatorById(utilizatorId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @GetMapping(value = "/login/{username}/{password}")
    public ResponseEntity<JSONObject> getUtilizator2(@PathVariable("username") String username, @PathVariable("password") String password) {
        UtilizatorDetailsDTO dto = utilizatorService.login(username,password);
        JSONObject obj=new JSONObject();
        obj.put("role",dto.getRole());
        System.out.println(dto.getRole());
        return new ResponseEntity<>(obj, HttpStatus.OK);
    }
}
