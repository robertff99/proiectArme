package projectArme.dtos.builders;

import projectArme.dtos.ArmeDetailsDTO;
import projectArme.entities.Arme;
import projectArme.dtos.ArmeDTO;

public class ArmeBuilder {

    private ArmeBuilder() {
    }

    public static ArmeDTO toArmeDTO(Arme arme) {
        return new ArmeDTO(arme.getId(), arme.getName(),arme.getCalibre(),arme.getPrice());
    }

    public static ArmeDetailsDTO toArmeDetailsDTO(Arme arme) {
        return new ArmeDetailsDTO(arme.getId(), arme.getName(), arme.getCalibre(), arme.getPrice());
    }

    public static Arme toEntity(ArmeDetailsDTO armeDetailsDTO) {
        return new Arme(armeDetailsDTO.getName(),
                armeDetailsDTO.getCalibre(),
                armeDetailsDTO.getPrice());
    }
}
