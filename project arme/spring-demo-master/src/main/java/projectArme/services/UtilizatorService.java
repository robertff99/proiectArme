package projectArme.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectArme.controllers.handlers.exceptions.model.ResourceNotFoundException;
import projectArme.dtos.UtilizatorDTO;
import projectArme.dtos.UtilizatorDetailsDTO;
import projectArme.dtos.builders.UtilizatorBuilder;
import projectArme.entities.Utilizator;
import projectArme.repositories.UtilizatorRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UtilizatorService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UtilizatorService.class);
    private final UtilizatorRepository utilizatorRepository;

    @Autowired
    public UtilizatorService(UtilizatorRepository utilizatorRepository) {
        this.utilizatorRepository = utilizatorRepository;
    }

    public List<UtilizatorDTO> findUtilizators() {
        List<Utilizator> utilizatorList = utilizatorRepository.findAll();
        return utilizatorList.stream()
                .map(UtilizatorBuilder::toUtilizatorDTO)
                .collect(Collectors.toList());
    }

    public UtilizatorDetailsDTO findUtilizatorById(UUID id) {
        Optional<Utilizator> prosumerOptional = utilizatorRepository.findById(id);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Utilizator with id {} was not found in db", id);
            throw new ResourceNotFoundException(Utilizator.class.getSimpleName() + " with id: " + id);
        }
        return UtilizatorBuilder.toUtilizatorDetailsDTO(prosumerOptional.get());
    }

    public UUID insert(UtilizatorDetailsDTO utilizatorDTO) {

        Utilizator utilizator = UtilizatorBuilder.toEntity(utilizatorDTO);

        utilizator = utilizatorRepository.save(utilizator);
        LOGGER.debug("Utilizator with id {} was inserted in db", utilizator.getId());
        return utilizator.getId();
    }

    public UtilizatorDetailsDTO login(String username, String password) {
        Optional<Utilizator> prosumerOptional = utilizatorRepository.findByUsernameAndPassword(username,password);
        if (!prosumerOptional.isPresent()) {
            LOGGER.error("Utilizator was not found in db");
            throw new ResourceNotFoundException(Utilizator.class.getSimpleName());
        }
        return UtilizatorBuilder.toUtilizatorDetailsDTO(prosumerOptional.get());
    }
}
