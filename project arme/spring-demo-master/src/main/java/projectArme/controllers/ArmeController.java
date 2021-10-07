package projectArme.controllers;


import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectArme.dtos.ArmeDTO;
import projectArme.dtos.ArmeDetailsDTO;
import projectArme.services.ArmeService;


import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/arme")
public class ArmeController {

    private final ArmeService armeService;

    @Autowired
    public ArmeController(ArmeService armeService) {
        this.armeService = armeService;
    }

    @GetMapping()
    public ResponseEntity<List<ArmeDTO>> getArmes() {
        List<ArmeDTO> dtos = armeService.findArmes();
        for (ArmeDTO dto : dtos) {
            Link armeLink = linkTo(methodOn(ArmeController.class)
                    .getArme(dto.getId())).withRel("armeDetails");
            dto.add(armeLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody ArmeDetailsDTO armeDTO) {
        UUID armeID = armeService.insert(armeDTO);
        return new ResponseEntity<>(armeID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ArmeDetailsDTO> getArme(@PathVariable("id") UUID armeId) {
        ArmeDetailsDTO dto = armeService.findArmeById(armeId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteUsers(@PathVariable("id") UUID id) {

        String s=armeService.delete(id);
        JSONObject obj = new JSONObject();

        obj.put("Delete", s);

        if(s.equals("Couldn't find user"))
            return new ResponseEntity<>(obj,HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(obj,HttpStatus.OK);
    }
    

}
