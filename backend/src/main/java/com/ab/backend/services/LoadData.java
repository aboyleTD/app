package com.ab.backend.services;

import com.ab.backend.types.Compendium;
import com.ab.backend.types.Deck;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Arrays;

public class LoadData {
    static String dataFolderPath = "data/";
    static String[] excludedNames_list = new String[]{"metafiles", ".ds_store", "corrigendi", "duplicates"};
    static HashSet<String> excludedNames = new HashSet<String>(Arrays.asList(excludedNames_list));

    private static boolean exclusionCriteria(String filename) {
        boolean isBunpou = filename.contains("文法");
        boolean isExcluded = excludedNames.contains(filename.toLowerCase());
        return isBunpou || isExcluded;
        
    }
    
    private static String getFileExtension(File file) {
        String name = file.getName();
        int lastIndexOf = name.lastIndexOf(".")+1;
        if (lastIndexOf == -1) {
            return ""; // empty extension
        }
        return name.substring(lastIndexOf);
    }
    private static String getFileName(File file) {
        String name = file.getName();
        int lastIndexOf = name.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return name; // empty extension
        }
        return name.substring(0,lastIndexOf);
    }
    private static HashSet<String> checkDuplicates(File[] files) {
        HashSet<String> seenNames = new HashSet<String>();
        HashSet<String> duplicates = new HashSet<String>();
        for (File file : files) {
            String name = getFileName(file);
            if (seenNames.contains(name)) {
                duplicates.add(name);
            } else {
                seenNames.add(name);
            }
        }
        return duplicates;
    }
    private static Compendium handleDir(File directory, int depth) {
        // System.out.println("Handling directory: " + directory.getName());
        ArrayList<Compendium> decks = new ArrayList<Compendium>();
        ArrayList<Compendium> compendium = new ArrayList<Compendium>();
        ObjectMapper objectMapper = new ObjectMapper();
        HashSet<String> duplicates = checkDuplicates(directory.listFiles());
        for (File file : directory.listFiles()) {
            if (exclusionCriteria(file.getName())) {
                // System.out.println("Excluded: " + file.getName());
                continue;
            }
            if (file.isDirectory()) {
                compendium.add(handleDir(file, depth + 1));
            } else {
                if (getFileExtension(file).equals("json")) {
                    try {
                        decks.add(objectMapper.readValue(file, Compendium.class));
                    } catch (Exception e) {
                        System.out.println("Error reading file: " + file.getName());
                        e.printStackTrace();
                    }
                } else {
                    if (!duplicates.contains(getFileName(file))) {
                        try {
                            decks.add(((Compendium) new Deck(file)));
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        
        if (decks.size() > 0) {
            if (depth != 2){
                System.out.println("Potential Error: Decks found at depth " + depth);
            }
            return new Compendium(directory.getName(), decks, Compendium.depthToType(depth));
        } else {
            return new Compendium(directory.getName(), compendium, Compendium.depthToType(depth));
        }

    }
    public static Compendium loadData() {
        // System.out.println("Loading data...");
        File cdir = new File(dataFolderPath);
        return handleDir(cdir,0);
    }
}
