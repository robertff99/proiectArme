package projectArme.controllers;


import antlr.collections.List;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectArme.dtos.AdminDTO;
import projectArme.dtos.AdminDetailsDTO;
import projectArme.services.AdminService;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@CrossOrigin
@RequestMapping(value = "/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping()
    public ResponseEntity<List<AdminDTO>> getAdmins() {
        List<AdminDTO> dtos = adminService.findAdmins();
        for (AdminDTO dto : dtos) {
            Link adminLink = linkTo(methodOn(AdminController.class)
                    .getAdmin(dto.getId())).withRel("adminDetails");
            dto.add(adminLink);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<UUID> insertProsumer(@Valid @RequestBody AdminDetailsDTO adminDTO) {
        UUID adminID = adminService.insert(adminDTO);
        return new ResponseEntity<>(adminID, HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<AdminDetailsDTO> getAdmin(@PathVariable("id") UUID adminId) {
        AdminDetailsDTO dto = adminService.findAdminById(adminId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<JSONObject> deleteUsers(@PathVariable("id") UUID id) {

        String s=adminService.delete(id);
        JSONObject obj = new JSONObject();

        obj.put("Delete", s);

        if(s.equals("Couldn't find user"))
            return new ResponseEntity<>(obj,HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(obj,HttpStatus.OK);
    }

}
