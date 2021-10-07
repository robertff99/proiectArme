package projectArme.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectArme.controllers.handlers.exceptions.model.ResourceNotFoundException;
import projectArme.dtos.ArmeDTO;
import projectArme.dtos.ArmeDetailsDTO;
import projectArme.dtos.ArmeDetailsDTO;
import projectArme.dtos.builders.ArmeBuilder;
import projectArme.entities.Arme;
import projectArme.repositories.ArmeRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ArmeService {
    private static final Logger LOGGER = LoggerFactory.getLogger(ArmeService.class);
    private final ArmeRepository armeRepository;

    @Autowired
    public ArmeService(ArmeRepository armeRepository) {
        this.armeRepository = armeRepository;
    }

    public List<ArmeDTO> findArmes() {
        List<Arme> armeList = armeRepository.findAll();
        return armeList.stream()
                .map(ArmeBuilder::toArmeDTO)
                .collect(Collectors.toList());
    }

    public ArmeDetailsDTO findArmeById(UUID id) {
        Optional<Arme> prosumerOptional = armeRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Arme with id {} was not found in db", id);
            throw new ResourceNotFoundException(Arme.class.getSimpleName() + " with id: " + id);
        }
        return ArmeBuilder.toArmeDetailsDTO(prosumerOptional.get());
    }

    public UUID insert(ArmeDetailsDTO armeDTO) {
        Arme arme = ArmeBuilder.toEntity(armeDTO);
        arme = armeRepository.save(arme);
        LOGGER.debug("Arme with id {} was inserted in db", arme.getId());
        return arme.getId();
    }
    public String delete(UUID id){
        armeRepository.deleteById(id);
        return "Completed";
    }

}
